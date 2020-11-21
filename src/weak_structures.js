// @flow
/*
 * Your code can access it, but the messages are managed by someone else’s code.
 * New messages are added, old ones are removed regularly by that code,
 * and you don’t know the exact moments when it happens.
 *
 * Now, which data structure you could use to store information
 * whether the message “have been read”?
 * The structure must be well-suited to give the answer “was it read?”
 * for the given message object.
 *
 * P.S. When a message is removed from messages,
 * it should disappear from your structure as well.
 *
 * P.P.S. We shouldn’t modify message objects,
 * add our properties to them.
 * As they are managed by someone else’s code, that may lead to bad consequences.
 *
 * https://javascript.info/weakmap-weakset#store-unread-flags
*/

type Message = {
  text: string,
  from: string,
}

let messages: Message[] = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
let isReadSet: WeakSet<Message> = new WeakSet();

const isRead = (msg: Message): boolean => isReadSet.has(msg);
const markAsRead = (msg: Message): void => {
  isReadSet.add(msg);
}

markAsRead(messages[0]);
console.log(isRead(messages[0]) === true);

module.exports = {
  markAsRead,
  isRead,
}
