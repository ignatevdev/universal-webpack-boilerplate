// Overriding default loader and prepending icons path
// Dynamically require svg by filename
const icon = name => require(`!babel!svg-react!./svg/${name}.svg`);

export default {
    Information: icon('information')
};