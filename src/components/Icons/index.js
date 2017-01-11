// Overriding default loader and prepending icons path
// Dynamically require svg by filename
const icon = name => require(`!babel-loader!svg-react-loader!./svg/${name}.svg`);

export default {
    Information: icon('information')
};