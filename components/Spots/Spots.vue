<template>
  <div class="spots-container">
    <figure class="spots spots-1">
      <img src="~/assets/img/ink/ink_1.png" width="50" alt="Decorative ink spots" />
    </figure>
    <figure class="spots spots-2">
      <img src="~/assets/img/ink/ink_2.png" width="50" alt="Decorative ink spots" />
    </figure>
    <figure class="spots spots-3">
      <img src="~/assets/img/ink/ink_3.png" width="50" alt="Decorative ink spots" />
    </figure>
    <figure class="spots spots-4">
      <img src="~/assets/img/ink/ink_4.png" width="50" alt="Decorative ink spots" />
    </figure>
    <figure class="spots spots-5">
      <img src="~/assets/img/ink/ink_5.png" width="50" alt="Decorative ink spots" />
    </figure>
  </div>
</template>

<style lang="scss">
  .spots-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
  }

  .spots {
    position: absolute;
    animation: 1s linear 1s infinite alternate soft-motion;

    @media screen and (max-width: 768px) {
      display: none;
    }

    &-1 {
      top: -5%;
      right: 20%;
    }

    &-2 {
      top: 30%;
      left: 15%;
    }

    &-3 {
      top: 55%;
      right: 18%;
      animation: 2s linear 1s infinite alternate-reverse soft-motion;
    }

    &-4 {
      top: 82%;
      left: 5%;
      animation: 1.5s linear 1s infinite alternate-reverse soft-motion;
    }

    &-5 {
      top: 90%;
      left: 90%;
    }
  }

  @keyframes soft-motion {
    0% {
      transform:
        translateX(.1rem)
        translateY(.1rem);
    }
    100% {
      transform: translateX(-.1rem);
    }
  }
</style>
