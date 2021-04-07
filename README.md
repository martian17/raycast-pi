<h1>Calculating pi using casting rays</h1>
<h2>Brief description</h2>
<br>
collision check are performed by `x < 0` and `tan(0.5) < y/x < tan(0.5)`<br>
where tangent is approximated from its taylor series and stored as a constant.<br>
<br>
<b>Relevant information</b>
```javascript
angle=1rad
τ=all_rays/hit_rays
π=τ/2
```

<a target="_blank" href="https://codepen.io/MartianLord/full/NWdajob">Demo</a><br>
<a target="_blank" href="https://github.com/martian17/raycast-pi">Github</a><br>