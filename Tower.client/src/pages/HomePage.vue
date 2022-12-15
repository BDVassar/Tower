<template>
  <!-- SECTION main cover photo -->
  <section class="row coverPhoto p-0  border border-info rounded mb-4">
  </section>
  <!-- SECTION events button navbar -->
  <section class="row justify-content-evenly bg-btnnav">
    <div class="col-6 col-md-1 text-center">
      <button class="btn btn-outline-light btnWidth border border-0"> Hello</button>
    </div>
    <div class="col-6 col-md-1 text-center">
      <button class="btn btn-outline-light btnWidth border border-0"> Hello</button>
    </div>
    <div class="col-6 col-md-1 text-center">
      <button class="btn btn-outline-light btnWidth border border-0"> Hello</button>
    </div>
    <div class="col-6 col-md-1 text-center">
      <button class="btn btn-outline-light btnWidth border border-0"> Hello</button>
    </div>
    <div class="col-6 col-md-1 text-center">
      <button class="btn btn-outline-light btnWidth border border-0"> Hello</button>
    </div>
    <div class="col-6 col-md-1 text-center">
      <button class="btn btn-outline-light btnWidth border border-0"> Hello</button>
    </div>
    <div class="col-6 col-md-1 text-center">
      <button class="btn btn-outline-light btnWidth border border-0"> Hello</button>
    </div>
  </section>
  <!-- SECTION events component -->
  <section class="row">

  </section>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.coverPhoto {
  background-image: url('https://s3-alpha-sig.figma.com/img/cd1b/eb35/3224c652f40c0754047c232b09e71cc3?Expires=1672012800&Signature=RW1nLQQV8mXj05s9VlVTLiUq3suFwCVdXGSvgqCseygTB5HSQpBLsn8~rVTExXTnwq2VlhL5C7QVuGPD6fsQsP029P0524QX-tyTB~Nb2n335I0ITFjnW-ziH3D6N0Rb-bRK6FGjR7E~-VDM93YxsoQSXWM7Asbt-FBYhAcfYMWggffjcMa5pSPHHmvf4sI7msLEyLhCZBjCn3xvk~TJr4274BvOiqjoOWYg0e9e3l1mDIkFmTV4~~llzxH~999X6Yqv2jmRXHWcLtDJogvPNS8AL6vHwmQTatIXzN7HSpTlm6Epj7SorOu3SPAPqe3sqc7H~N1rcvL2OjNlHVJwYg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4');
  height: 40vh;
  width: 100%;
  object-fit: cover;
  object-position: top;
}

.btnWidth {
  width: 100%
}

.bg-btnnav {
  background-color: #474C61;
}
</style>
