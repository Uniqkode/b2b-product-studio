"""Compare every brand page and key asset with the published GitHub Pages release."""
import argparse
import concurrent.futures
import datetime
import hashlib
import json
import subprocess
import urllib.request
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--base', default='https://uniqkode.github.io/b2b-product-studio/')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
docs = root / 'docs'
targets = [docs / 'index.html']
for brand in sorted(path for path in docs.iterdir() if path.is_dir() and (path / 'assets/config.js').is_file()):
    targets.extend(sorted(path for path in brand.rglob('*') if path.is_file() and path.name != '.nojekyll'))


def check(filename):
    relative = filename.relative_to(docs).as_posix()
    route = relative[:-10] if relative.endswith('index.html') else relative
    url = args.base.rstrip('/') + '/' + route
    expected = hashlib.sha256(filename.read_bytes()).hexdigest()
    try:
        request = urllib.request.Request(url, headers={'User-Agent': 'B2B-Product-Studio-Release-Check/3.0'})
        with urllib.request.urlopen(request, timeout=25) as response:
            status = response.status
            actual = hashlib.sha256(response.read()).hexdigest()
        return {'url': url, 'status': status, 'matches': expected == actual, 'sha256': actual}
    except Exception as error:
        return {'url': url, 'status': None, 'matches': False, 'error': str(error)}


with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    results = list(pool.map(check, targets))
passed = sum(row['status'] == 200 and row['matches'] for row in results)
output = {'checked_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
          'commit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip(),
          'base_url': args.base, 'checked': len(results), 'passed': passed,
          'method': 'HTTPS status 200 and SHA-256 equality with local output', 'results': results}
(root / 'qa/live-check-results.json').write_text(json.dumps(output, indent=2) + '\n')
print(f'{passed}/{len(results)} published pages and assets match the local build.')
for result in results:
    if result['status'] != 200 or not result['matches']:
        print(json.dumps(result))
raise SystemExit(0 if passed == len(results) else 1)
