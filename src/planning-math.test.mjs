import test from 'node:test';
import assert from 'node:assert/strict';
import * as p from './planning-math.js';
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-7,`${actual} vs ${expected}`);
test('review plans reconcile both time bases and allow a worse outcome',()=>{
 const r=p.reviewTime({volume:80,before:45,after:20,hourly:6500});near(r.currentHours,60);near(r.plannedHours,80/3);near(r.hours,100/3);near(r.cost,650000/3);
 const slower=p.reviewTime({volume:60,before:10,after:20,hourly:100});assert.equal(slower.hours,-10);assert.equal(slower.cost,-1000);
 for(const value of ['',NaN,-1,Infinity])assert.throws(()=>p.reviewTime({volume:value,before:10,after:5,hourly:100}));
});
test('ticket comparisons preserve receiving surpluses and reject zero dispatch',()=>{
 near(p.weights(30,29.4).difference,.6);near(p.weights(30,29.4).percent,2);
 assert.ok(p.weights(30,31).difference<0);assert.throws(()=>p.weights(0,1));
});
test('water reserves and allocations reconcile without negative zones',()=>{
 for(const [budget,reserve] of [[1500,10],[1,85],[1000,100],[1,99],[100000,0]]){
  const r=p.water(budget,reserve);assert.ok(r.zones.every(n=>n>=0));near(r.zones.reduce((a,b)=>a+b,0),r.available);near(r.available+r.reserved,budget);
 }
 assert.throws(()=>p.water(100,101));assert.throws(()=>p.water(0,10));
});
test('a temperature review requires both an exceeded threshold and a duration',()=>{
 assert.equal(p.temperature(6.8,6,35).review,true);assert.equal(p.temperature(6,6,35).review,false);assert.equal(p.temperature(6.8,6,0).review,false);
 assert.throws(()=>p.temperature(100,6,35));
});
test('area differences are symmetric in magnitude and relative to the stated survey',()=>{
 near(p.area(8.4,7.9).difference,.5);near(p.area(8.4,7.9).percent,.5/8.4*100);assert.equal(p.area(5,5).difference,0);assert.throws(()=>p.area(0,5));
});
test('notice calculations use exact UTC calendar days and reject normalized invalid dates',()=>{
 assert.equal(p.notice('2028-03-01',1).date,'2028-02-29');assert.equal(p.notice('2027-03-31',120).date,'2026-12-01');
 assert.throws(()=>p.notice('2026-02-30',30));assert.throws(()=>p.notice('2027-03-31',1.5));
});
test('video frame counts follow camera-hours and sampling without implying model runtime',()=>{
 const r=p.video(8,12,.25);assert.equal(r.cameraHours,96);assert.equal(r.frames,86400);
 assert.throws(()=>p.video(8.5,12,.25));assert.throws(()=>p.video(8,25,.25));assert.throws(()=>p.video(8,12,0));
});
test('coverage counts only job days after expiry, including boundaries and leap dates',()=>{
 assert.equal(p.coverage('2026-11-15','2026-11-18','2026-11-21').uncoveredDays,4);
 assert.equal(p.coverage('2026-11-20','2026-11-18','2026-11-21').uncoveredDays,1);
 assert.equal(p.coverage('2026-11-21','2026-11-18','2026-11-21').uncoveredDays,0);
 assert.equal(p.coverage('2028-02-28','2028-02-29','2028-03-01').uncoveredDays,2);
 assert.throws(()=>p.coverage('2026-11-20','2026-11-21','2026-11-18'));
});
