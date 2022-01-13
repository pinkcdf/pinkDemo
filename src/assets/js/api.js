import request from "./request";

export function selectConfig(params){
  console.log(params);
  return request("/api/file/selectConfig",
    {
      methods:"get",
      data:params,
    })
}