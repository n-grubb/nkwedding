<template>
  <div class="dots-container">
    <figure class="cluster cluster-1">
      <img src="~/assets/img/dot-cluster.svg" width="300" alt="A decorative group of dots" />
    </figure>
    <figure class="cluster cluster-2">
      <img src="~/assets/img/dot-cluster.svg" width="400" alt="A decorative group of dots" />
    </figure>
    <figure class="cluster cluster-3">
      <img src="~/assets/img/dot-cluster.svg" width="500" alt="A decorative group of dots" />
    </figure>
  </div>
</template>

<style lang="scss">
  .dots-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
  }

  .cluster {
    position: absolute;

    &-1 {
      top: -4rem;
      left: -4rem;
      transform: rotate(140deg);
    }

    &-2 {
      top: 8rem;
      right: -12rem;
      transform: rotate(70deg);
    }

    &-3 {
      bottom: -13.5rem;
      left: -8rem;
      transform: rotate(-20deg);
    }
  }
</style>
