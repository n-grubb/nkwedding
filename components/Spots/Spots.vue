<template>
  <div class="spots-container">
    <figure class="spots spots-1">
      <img src="~/assets/img/ink/ink_1.png" width="50" />
    </figure>
    <figure class="spots spots-2">
      <img src="~/assets/img/ink/ink_2.png" width="50" />
    </figure>
    <figure class="spots spots-3">
      <img src="~/assets/img/ink/ink_3.png" width="50" />
    </figure>
    <figure class="spots spots-4">
      <img src="~/assets/img/ink/ink_4.png" width="50" />
    </figure>
    <figure class="spots spots-5">
      <img src="~/assets/img/ink/ink_5.png" width="50" />
    </figure>
  </div>
</template>

<script>
export default {

}
</script>

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
  }

  &-4 {
    top: 82%;
    left: 5%;
  }

  &-5 {
    top: 90%;
    left: 90%;
  }
}
</style>
