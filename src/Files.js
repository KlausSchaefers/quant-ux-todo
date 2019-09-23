class Files {

    constructor () {
        this.list = []
    }

    findAll () {
        return this.list
    }

    create (name, size) {
        this.list.push({
            id: this.list.length,
            name: name,
            size: size
        })
    }

}
export default new Files()