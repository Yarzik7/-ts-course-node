import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { IPerson } from "./Person.types";

const storageData: IPerson[] = [];

@JsonController("/person")
export default class Person {
  @Get()
  async getAll() {
    return storageData;
  }

  @Get("/:id")
  async getOne(@Param("id") id: number): Promise<IPerson | {}> {
    const person = storageData.find((item) => item.id === id);
    return person || {};
  }

  @Post()
  async setPerson(@Body() body: IPerson) {
    storageData.push(body);
    return true;
  }
}
