

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CalulatorPage extends Page {
    /**
     * define selectors using getter methods
     */
    get number1Input () {
        return $('#number1Field');
    }

    get number2Input () {
        return $('#number2Field');
    }

    get operatorDropdown () {
      return $('#selectOperationDropdown');
  }

    get calculateBtn () {
        return $('#calculateButton');
    }

    get awnserForm(){
      return $('#answerForm')
    }

    get anwserField (){ 
      return $('#numberAnswerField');
    }

    get errorMsgForm () {
      return $('#errorForm')
    }

    get errorMsgField () {
      return $('#errorMsgField')
    }

    get buildDropdown () {
      return $('#selectBuild')
    }

    get clearBtn () {
      return $('#clearButton')
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to set a number into input 
     */
    async calculate (number1, number2, operator) {
        await this.number1Input.setValue(number1);
        await this.number2Input.setValue(number2);
        await this.operatorDropdown.selectByVisibleText(operator)
        await this.calculateBtn.click();
    }

    async selectBuild (build){
      await this.buildDropdown.selectByVisibleText(build);
    }

    async clear (){
      await this.clearBtn.click();
    }

    async waitForAwnser(){
      await this.awnserForm.waitForDisplayed({ timeout: 5000 });
    }

    async resultNumber () {      
      return await this.anwserField.getValue();
    }

    async waitForMessages(){
      await this.errorMsgForm.waitForDisplayed({ timeout: 5000 });
    }

    async errorMsg () {
      return await this.errorMsgField.getText();
    }

    async refresh() {
      return browser.refresh(); 
    }

    /**
     * overwrite specific options to adapt it to page object
    */
    open () {
        return super.open("");
    }
    
}

module.exports = new CalulatorPage();
