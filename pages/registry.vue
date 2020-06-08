<template>
  <div class="page registry">
    <h1>Registry</h1>
    <div class="page-content">
      <p>We are registered at the following stores:</p>
      <ul>
        <li>
          <a href="https://bit.ly/3dDrYwe" target="_blank" title="Crate &amp; Barrel Registry">Crate &amp; Barrel</a>
        </li>
        <li>
          <a href="https://bit.ly/372CJ8G" target="_blank" title="West Elm Registry">West Elm</a>
        </li>
        <li>
          <a href="https://bit.ly/3eSmyxn" target="_blank" title="Target Registry">Target</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Katianne and Noah | Registry'
    }
  }
}
</script>

<style lang="scss">
.registry {
  font-size: 1.25em;

  .page-content {
    background-color: rgba(249, 232, 218, 0.7);
    padding: 1rem;
    margin: 0 1rem;
    border-radius: .25rem;
  }
  

  ul {
    color: #E6B0A2;
    font-weight: bold;
    padding-left: 1.5rem;

    li {
      margin-top: 1rem;
    }

    a {
      color: black;

      &:hover {
        color: #E6B0A2;
      }
    }
  }
}
</style>
