/*
var competencies = facets.map((facet, index) => {
  return { label: facet, description: descriptions[index] };
});
console.log(JSON.stringify(competencies));
*/


let careerPaths = [];
let templist = {};

groups.forEach((group, index) => {
    let competencies = Object.keys(group.competencies);
    competencies.forEach((comp, index2) => {
      let paths = Object.keys(group.competencies[comp].idealScores);
      paths.forEach((path, index3) => {
        if(!templist[path]){
          templist[path] = true;
          careerPaths.push(path);
        }
      });
    });
});
