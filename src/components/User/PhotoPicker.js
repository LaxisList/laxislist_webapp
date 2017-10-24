export const photoPicker = {
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      let filename = files[0].name
      if (files[0].size / 1024 > 1024) {
        return alert('La photo téléchargée est trop grande. Veuillez réessayez avec une photo de petite taille, maximum 1MB.')
      }
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Photo invalide. Veuillez réessayez avec une autre photo.')
      }
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      this.image = files[0]
    }
  }
}
