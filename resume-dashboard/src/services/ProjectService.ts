import api from "../api/api";

export const getProjects = async () => {
    return await api.get("/GetProjects")
}

export const upsertProject = async (Project: any) => {
    return await api.post("/UpsertProject", Project)
}

export const deleteProject = async (id:number) => {
    console.log("number id is : ", id);
    return await api.delete(`/DeleteProjectById/${id}`)
}