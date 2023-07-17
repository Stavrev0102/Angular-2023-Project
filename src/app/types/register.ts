
interface passGroup{
    password:string,
    rePassword:string
}
export interface Register{
    email:string,
    passGroup: passGroup[]
}