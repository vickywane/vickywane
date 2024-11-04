const loadFeatures = () =>
  import("./features").then((res) => res.default);

export default loadFeatures;
