<template>
  <div class="florals-container">
    <figure class="floral floral-1">
      <img src="~/assets/img/florals/floral_1.png" width="200" alt="Decorative floral branch" />
    </figure>
    <figure class="floral floral-2">
      <img src="~/assets/img/florals/right-branch.png" width="300" alt="Decorative floral branch" />
    </figure>
    <figure class="floral floral-3">
      <img src="~/assets/img/florals/left-branch.png" width="300" alt="Decorative floral branch" />
    </figure>
  </div>
</template>

<style lang="scss">
  .florals-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
  }

  .floral {
    position: absolute;
    animation: 1s linear 1s infinite alternate slow-breeze;

    &-1 {
      bottom: 10rem;
      right: 0px;
      transform: rotate(0deg);
    }

    &-2 {
      top: -10px;
      right: 6%;
      transform: rotate(-45deg);
    }

    &-3 {
      top: 15rem;
      left: -5rem;
    }
  }

  @media screen and (max-width: 768px) {
    .floral-1 img {
      width: 150px;
    }

    .floral-3 img {
      width: 200px;
    }
  }
</style>
