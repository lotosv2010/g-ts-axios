console.log('TS')

type resType = string | number | boolean | null | undefined;
interface Person {
  firstname: string;
  lastname: string;
}

class User {
  public firstname: string;
  public lastname: string;
  private fullname: string;
  constructor(firstname: string, lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.fullname = this.firstname + ' ' + this.lastname;
  }
  getFullName(): string {
    return this.fullname;
  }
}

const fn = (person: Person): resType => {
  return `Hello ${person.firstname}-${person.lastname}`;
}

const p: Person = {
  lastname: 'Doe',
  firstname: 'John'
}

fn(p);

const u = new User('John', 'Doe');
fn(u)

// 01
const isDone: boolean = true
const num: number = 2
const num2:number = 0x14
const num3 = 0b10100
const num4: number = 0o24
const str: string = 'hello'
const arr: number[] = [1, 3, 4]
const arr2: Array<number> = [1, 3, 4]
const tuple: [number, string] = [1, '2']

// 02
enum Color {
  Red,
  Green,
  Blue
}
let green: Color = Color.Green

// 03
let a: any = 123
a = '123'

// 04
const fnVoid = (): void => {
  console.log('fn')
}


// 05
