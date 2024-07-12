import { LightningElement, track } from 'lwc';
import createSurvey from '@salesforce/apex/SurveyControllerPages.createSurvey';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Survey extends LightningElement {
   
   @track pages = [{ questions: [] }]
   title = ""
   handleAddQuestion(event) {
      this.pages[event.target.dataset.page].questions.push(
         {
            id: this.pages[event.target.dataset.page].questions.length + 1,
            question_text: '',
            inputType: 'text',
            isTextField: true,
            isNumberField: false,
            isRadioField: false,
            isCheckBoxField: false,
            isRatingField: false,
            radioChoices: [],
            checkBoxChoices: [],
            minScale: 1,
            maxScale: 5,
            required: false
         }
      )
       console.log(pages)
   }

   handleAddPage(event) {
      this.pages.push({ questions: [] })
      console.log(pages)
   }

   get options() {
      return [
         { label: 'Text', value: 'text' },
         { label: 'Number', value: 'number' },
         { label: 'Radio Group', value: 'radio'},
         { label: 'Checkbox Group', value: 'checkbox'},
         { label: 'Rating', value: 'rating'}
     ];
   }

   handleInputTypeChange(event) {
      const indexPage = event.target.dataset.page
      const index = event.target.dataset.id
      this.pages[indexPage].questions[index].inputType = event.target.value
      this.pages[indexPage].questions[index].isTextField = event.target.value === 'text'
      this.pages[indexPage].questions[index].isNumberField = event.target.value === 'number'
      this.pages[indexPage].questions[index].isRadioField = event.target.value === 'radio'
      this.pages[indexPage].questions[index].isCheckBoxField = event.target.value === 'checkbox'
      this.pages[indexPage].questions[index].isRatingField = event.target.value === 'rating'
   }


   // sendData() {
   //    // Array.from(this.questions).forEach(item =>{
   //    //    console.log(item.answer, item.radioChoices)
   //    // })
   //    // console.log(JSON.stringify(this.questions))
   //    // alert(JSON.stringify(this.questions))
   //    const data = this.questions

   //    const dataChangeEvent = new CustomEvent('datachange', {
   //       detail: data
   //    })

   //    this.dispatchEvent(dataChangeEvent)
   // }

   // handleSave(event) {

   // }
   
   

   handleSaveChanges(event) {
      const indexPage = event.target.dataset.page
      const index = event.target.dataset.id
      this.pages[indexPage].questions[index].question_text = event.target.value
   }

   handleDeleteQuestion(event) {
      const indexPage = event.target.dataset.page
      const index = event.target.dataset.id
      this.pages[indexPage].questions = this.pages[indexPage].questions.filter((item, i) => i != parseInt(index))
   }
   
   handleAddRadio(event) {
      const indexPage = event.target.dataset.page
      const index = event.target.dataset.id
      this.pages[indexPage].questions[index].radioChoices.push({
         value: ''
      })
   }
   
   handleRadioChange(event) {
      const indexPage = event.target.dataset.page
      const index1 = event.target.dataset.id
      const index = event.target.dataset.rad
      this.pages[indexPage].questions[index1].radioChoices[index].value = event.target.value
   }

   handleDeleteRadio(event) {
      const indexPage = event.target.dataset.page
      const index1 = event.target.dataset.id
      const index = event.target.dataset.rad
      this.pages[indexPage].questions[index1].radioChoices = this.pages[indexPage].questions[index1].radioChoices.filter((item, i) => i !== parseInt(index))
   }

   handleAddCheckBox(event) {
      const indexPage = event.target.dataset.page
      const index = event.target.dataset.id
      this.pages[indexPage].questions[index].checkBoxChoices.push({
         value: ''
      })
   }
   
   handleCheckBoxChange(event) {
      const indexPage = event.target.dataset.page
      const index1 = event.target.dataset.id
      const index = event.target.dataset.check
      this.pages[indexPage].questions[index1].checkBoxChoices[index].value = event.target.value
   }

   handleDeleteCheckBox(event) {
      const indexPage = event.target.dataset.page
      const index1 = event.target.dataset.id
      const index = event.target.dataset.check
      this.pages[indexPage].questions[index1].checkBoxChoices = this.pages[indexPage].questions[index1].checkBoxChoices.filter((item, i) => i !== parseInt(index))
   }

   handleMinScale(event) {
      const indexPage = event.target.dataset.page
      const index = event.target.dataset.id
      this.pages[indexPage].questions[index].minScale = parseInt(event.target.value)
   }

   handleMaxScale(event) {
      const indexPage = event.target.dataset.page
      const index = event.target.dataset.id
      this.pages[indexPage].questions[index].maxScale = parseInt(event.target.value)
   }

   handleMandate(event) {
      const indexPage = event.target.dataset.page
      const index = event.target.dataset.id
      this.pages[indexPage].questions[index].required = event.target.checked
   }

   get jsonData() {
      return JSON.stringify(this.pages, null, 2)
   }

   handleDeletePage(event) {
      const indexPage = event.target.dataset.page
      this.pages = this.pages.filter((item, i) => i !== parseInt(indexPage))
   }

   handleTitleChange(event) {
      this.title = event.target.value
   }

   handleSave(event) {
      const surveyData = JSON.stringify(this.pages);

      createSurvey({ title: this.title, pagesJson: surveyData })
          .then(() => {
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Success',
                      message: 'Survey created successfully',
                      variant: 'success'
                  })
              );
          })
          .catch(error => {
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Error',
                      message: error.body.message,
                      variant: 'error'
                  })
              );
          });
         }
   
}
