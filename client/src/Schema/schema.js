import AddBrand from "../Components/Brands/AddBrand"

const schema = {
    getBrands: () => "query{brands{id name createdAt type country description}}",
    deleteBrand: (id) => `mutation{deleteBrand(id: ${id}) {id}}`,
    AddBrand: (name, createdAt, type, country, description) => `mutation{createBrand(name: ${name}, createdAt: ${createdAt}, country: ${country}, type: ${type}, description: ${description}) {id, name, country, type, createdAt, description}}`
}

export default schema