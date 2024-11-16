import Person from "./person/Person";

type Controller = typeof Person;

const controllers = <Controller[]>[Person];

export { controllers };
