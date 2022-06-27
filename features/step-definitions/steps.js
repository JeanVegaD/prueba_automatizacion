const { Given, Then } = require('@wdio/cucumber-framework');
const assert = require('assert').strict;

const CalulatorPage = require('../pageobjects/calculator.page');
var DataTest;

Given(/^I open calculator page$/, async () => {
  await CalulatorPage.open()
});

Given(/^A JSON file named (.*)$/, async ( file ) => {
  DataTest = require(`../resources/${file}.json`);
  expect(DataTest).not.toBeNull();
});

Given(/^Use (.*) build$/, async ( build ) => {
  await CalulatorPage.selectBuild(build);
});

Then(/^Execute file operations$/, async () => {
  let error = false
  let outputMesasge = ""
  for (element of DataTest){
    await CalulatorPage.calculate(element.number1 , element.number2, element.operator);
    await CalulatorPage.waitForMessages();
    const errorMsg = await CalulatorPage.errorMsg()
    if(errorMsg == "Divide by zero error!" && errorMsg === element.errorMsg){
      await CalulatorPage.refresh()
    }
    else if(errorMsg === element.errorMsg){
      await CalulatorPage.waitForAwnser();
      const result = await CalulatorPage.resultNumber()
      if(element.operator!== "Concatenate" && result && !errorMsg){
        if(Number.parseFloat(result).toFixed(4) != Number.parseFloat(element.result).toFixed(4)){
          error = true
          outputMesasge+= `[${element.number1}] ${element.operator} [${element.number2}] = ${result}. El resultado esperado es ${element.result} \n`
        }
      }
    }else{
      outputMesasge+= `[${element.number1}] ${element.operator} [${element.number2}]. El resultado esperado es: ${element.errorMsg} \n`
      error = true
    }
    await CalulatorPage.clear();
  }
  console.log(outputMesasge)
  assert.ok(!error, `Las siguientes expresiones han fallado: \n${outputMesasge}`)
});

