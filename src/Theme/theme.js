import theme from "./variable.scss";

let color = theme;
color = color.replace(":export {","");
color = color.slice(0,-1);
color = color.split(';');
color.pop();
color = color.map(c => c.replace("\n  ","").replace(" ",""));
color = color.map(c => c.split(':'));
console.log(color);

let tc = {
  mainBg: color[0][1],
  minorBg: color[1][1],
  secondry: color[2][1],
  ternary: color[3][1],
  hover: color[4][1],
  primary: color[5][1],
  text: color[6][1],
};

console.log(tc);

export default tc;