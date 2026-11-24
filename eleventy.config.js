export default function (eleventyConfig) {
    eleventyConfig.setInputDirectory('src');
    eleventyConfig.setOutputDirectory('dist');
    eleventyConfig.addPassthroughCopy('src/assets');
    return {};
}
