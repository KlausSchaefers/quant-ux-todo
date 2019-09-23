class Todo {

    constructor () {
        this.list = []
    }

    findAll () {
        return this.list
    }

    create (name, description) {
        this.list.push({
            id: this.list.length,
            name: name,
            description: description
        })
    }

}
export default new Todo()