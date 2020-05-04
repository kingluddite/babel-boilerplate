console.log('index.js')
// console.log(
//   `%c ________________________________________
// < mooooooooooooooooooooooooooooooooooooo >
//  ----------------------------------------
//         \\   ^__^
//          \\  (oo)\\_______
//             (__)\\       )\\/\\
//                 ||----w |
//                 ||     ||`,
//   'font-family:monospace'
// )

const todo = {
  id: 'asdfdsfasdf',
  text: 'pay the bills',
  completed: false,
  notFeelingLove: true,
}

const {
  // id,
  text: todoText,
  completed,
  details: coolDetails = 'no details provided',
  ...others
} = todo
// console.log(id) // asdfdsfasdf
// console.log(text) // pay the bills
// console.log(todoText) // pay the bills
// console.log(completed) // false
// console.log(coolDetails) // 'no details provided'
// console.log(others)

const age = [21, 31, 41, 51]
const [firstAge, ...othersArr] = age

console.log(firstAge) // 21
console.log(othersArr) // [31, 41, 51]

console.log('#############')

const printTodo = ({ text: otherText, completed, ...otherTodoProps }) => {
  console.log(`${otherText}: ${completed} `)
  console.log(otherTodoProps)
}

printTodo(todo)
