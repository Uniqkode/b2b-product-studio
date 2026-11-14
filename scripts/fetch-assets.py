"""Download licensed display assets; no credentials or application dependencies."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json, re, urllib.request

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'src' / 'assets'
OUT.mkdir(parents=True, exist_ok=True)
PHOTOS = {
 'fields':'photo-1500382017468-9049fed747ef', 'grain':'photo-1574323347407-f5e1ad6d020b',
 'irrigation':'photo-1560493676-04071c5f467b', 'produce':'photo-1542838132-92c53300491e',
 'building':'photo-1486406146926-c627a92ad1ab',
 'interior':'photo-1497366811353-6870744d04b2', 'security':'photo-1494412519320-aa613dfb7738',
 'lobby':'photo-1497366754035-f200968a6e72', 'office':'photo-1497366216548-37526070297c'
}
def fetch_photo(item):
 name, photo = item
 url=f'https://images.unsplash.com/{photo}?auto=format&fit=crop&w=1800&q=84&fm=jpg'
 path=OUT/f'{name}.jpg'
 if not path.exists():
  with urllib.request.urlopen(url, timeout=40) as response: data=response.read()
  if not data.startswith(b'\xff\xd8'): raise ValueError(f'{name}: not a JPEG')
  path.write_bytes(data)
 return {'asset':name, 'bytes':path.stat().st_size, 'source':url, 'license':'https://unsplash.com/license'}

FONTS = {
 'DM Sans':[400,500,600,700], 'DM Serif Display':[400], 'Libre Baskerville':[400,700],
 'Manrope':[400,500,600,700], 'Outfit':[400,500,600,700], 'Space Grotesk':[400,500,600,700],
 'Instrument Serif':[400], 'Cormorant Garamond':[400,500,600], 'Barlow Condensed':[500,600,700],
 'Fraunces':[400,500,600], 'IBM Plex Sans':[400,500,600,700]
}
def fetch_font(item):
 family, weights = item
 query=family.replace(' ','+')+':wght@'+';'.join(map(str,weights))
 request=urllib.request.Request('https://fonts.googleapis.com/css2?family='+query+'&display=swap',headers={'User-Agent':'Mozilla/5.0'})
 css=urllib.request.urlopen(request,timeout=30).read().decode()
 # Retain the Latin subset where the API returns subsets. Older responses supply one full font.
 blocks=re.findall(r'(?:/\* ([^*]+) \*/\s*)?(@font-face\s*\{[^}]+\})',css)
 kept=[]
 for subset, block in blocks:
  if subset and subset.strip()!='latin': continue
  for url in re.findall(r'url\(([^)]+)\)',block):
   suffix='.woff2' if '.woff2' in url else '.ttf'
   weight=re.search(r'font-weight:\s*([^;]+)',block).group(1).strip().replace(' ','-')
   filename=family.lower().replace(' ','-')+'-'+weight+suffix
   path=OUT/filename
   if not path.exists(): path.write_bytes(urllib.request.urlopen(url,timeout=30).read())
   block=block.replace(url,filename)
  kept.append(block)
 return '\n'.join(kept)

if __name__=='__main__':
 with ThreadPoolExecutor(max_workers=6) as pool:
  sources=list(pool.map(fetch_photo,PHOTOS.items()))
 print(json.dumps(sources,indent=2))
 (OUT/'image-sources.json').write_text(json.dumps(sources,indent=2))
 land_url='https://upload.wikimedia.org/wikipedia/commons/f/f1/Aerial_photo_of_a_beautiful_farmland_in_Lagos.jpg'
 land_path=OUT/'land.jpg'
 if not land_path.exists():
  request=urllib.request.Request(land_url,headers={'User-Agent':'B2BStudio/1.0'})
  data=urllib.request.urlopen(request,timeout=30).read()
  if not data.startswith(b'\xff\xd8'): raise ValueError('Land asset is not JPEG')
  land_path.write_bytes(data)
 sources.append({'asset':'land','source':land_url,'credit':'Ayorinde Ogundele','license':'https://creativecommons.org/licenses/by-sa/4.0/','source_page':'https://commons.wikimedia.org/wiki/File:Aerial_photo_of_a_beautiful_farmland_in_Lagos.jpg'})
 (OUT/'image-sources.json').write_text(json.dumps(sources,indent=2))
 with ThreadPoolExecutor(max_workers=4) as pool:
  css='\n'.join(pool.map(fetch_font,FONTS.items()))
 (OUT/'fonts.css').write_text(css)
 print('Local fonts ready:',len(list(OUT.glob('*.woff2')))+len(list(OUT.glob('*.ttf'))))
 license_parts=[]
 for family in FONTS:
  font_folder=family.lower().replace(' ','')
  url=f'https://raw.githubusercontent.com/google/fonts/main/ofl/{font_folder}/OFL.txt'
  text=urllib.request.urlopen(url,timeout=30).read().decode()
  license_parts.append(f'{family}\nSource: {url}\n\n{text}')
 (OUT/'FONT-LICENSES.txt').write_text('\n\n'+'\n\n'.join(license_parts))
 print('Open font license notices ready.')
