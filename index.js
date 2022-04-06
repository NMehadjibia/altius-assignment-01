const SinglyLinkedListNode = require('./Classes/SinglyLinkedListNode');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

main();

async function main(){
    const inputsFolderName = "Inputs";
    const inputsFileName = "assignment01-1.txt";
    const inputsFilePath = path.join(__dirname, inputsFolderName, inputsFileName);

    const inputsReadStream = fs.createReadStream(inputsFilePath, 'utf8');
    const inputsReadLineStream = readline.createInterface({
        input: inputsReadStream,
        crlfDelay: Infinity
    });
    const inputsIterator = inputsReadLineStream[Symbol.asyncIterator]();

    let testCases = [];

    try{
        let list1SizeLine = await inputsIterator.next();
        
        while (!list1SizeLine.done) {
            let list1Head;
            let previousNode;
            let currentNode;

            let list1Size = parseInt(list1SizeLine.value);
            for (let i = 0; i < list1Size; i ++){
                let line = await inputsIterator.next();
                currentNode = new SinglyLinkedListNode(parseInt(line.value), null);
                if (i === 0) list1Head = currentNode;
                else previousNode.next = currentNode;
                previousNode = currentNode;
            }

            let list2Head;

            let list2SizeLine = await inputsIterator.next();
            let list2Size = parseInt(list2SizeLine.value);
            for (let i = 0; i < list2Size; i ++){
                let line = await inputsIterator.next();
                currentNode = new SinglyLinkedListNode(parseInt(line.value), null);
                if (i === 0) list2Head = currentNode;
                else previousNode.next = currentNode;
                previousNode = currentNode;
            }
            testCases.push({ list1Head, list2Head });
            list1SizeLine = await inputsIterator.next();
        }
    } catch (error) {
        console.log("Something went wrong while processing inputs !");
    } finally {
        inputsReadLineStream.close();
        inputsReadStream.close();
    }
       
    for (let test of testCases){
        let result = compareLists(test.list1Head, test.list2Head);
        console.log(result);
    }
}

function compareLists(list1Head, list2Head) {
    let equal = true;
    let endList1 = !list1Head;
    let endList2 = !list2Head;
    while (equal && !endList1 && !endList2) {
        equal = list1Head.data === list2Head.data;
        list1Head = list1Head.next;
        list2Head = list2Head.next;
        endList1 = !list1Head;
        endList2 = !list2Head;
    }
    return equal && endList1 && endList2 ? 1 : 0;
}