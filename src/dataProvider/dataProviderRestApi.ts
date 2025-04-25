import simpleRestProvider from "ra-data-simple-rest";

const apiUrl = "http://localhost:8080/api";
export const dataProvider = simpleRestProvider(apiUrl);
