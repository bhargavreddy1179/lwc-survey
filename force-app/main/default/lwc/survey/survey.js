import { LightningElement, track } from 'lwc';

export default class Survey extends LightningElement {
   @track questions = []
   @track newObj
   handleAddQuestion(event) {
      this.questions.push(
         {
            id: this.questions.length + 1,
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
      const index = event.target.dataset.id
      this.questions[index].inputType = event.target.value
      this.questions[index].isTextField = event.target.value === 'text'
      this.questions[index].isNumberField = event.target.value === 'number'
      this.questions[index].isRadioField = event.target.value === 'radio'
      this.questions[index].isCheckBoxField = event.target.value === 'checkbox'
      this.questions[index].isRatingField = event.target.value === 'rating'
   }


   sendData() {
      // Array.from(this.questions).forEach(item =>{
      //    console.log(item.answer, item.radioChoices)
      // })
      // console.log(JSON.stringify(this.questions))
      // alert(JSON.stringify(this.questions))
      const data = this.questions

      const dataChangeEvent = new CustomEvent('datachange', {
         detail: data
      })

      this.dispatchEvent(dataChangeEvent)
   }

   handleSaveChanges(event) {
      const index = event.target.dataset.id
      this.questions[index].question_text = event.target.value
   }

   handleDeleteQuestion(event) {
      const index = event.target.dataset.id
      this.questions = this.questions.filter((item, i) => i != parseInt(index))
   }
   
   handleAddRadio(event) {
      const index = event.target.dataset.id
      this.questions[index].radioChoices.push({
         value: ''
      })
   }
   
   handleRadioChange(event) {
      const index1 = event.target.dataset.id
      const index = event.target.dataset.rad
      this.questions[index1].radioChoices[index].value = event.target.value
   }

   handleDeleteRadio(event) {
      const index1 = event.target.dataset.id
      const index = event.target.dataset.rad
      this.questions[index1].radioChoices = this.questions[index1].radioChoices.filter((item, i) => i !== parseInt(index))
   }

   handleAddCheckBox(event) {
      const index = event.target.dataset.id
      this.questions[index].checkBoxChoices.push({
         value: ''
      })
   }
   
   handleCheckBoxChange(event) {
      const index1 = event.target.dataset.id
      const index = event.target.dataset.check
      this.questions[index1].checkBoxChoices[index].value = event.target.value
   }

   handleDeleteCheckBox(event) {
      const index1 = event.target.dataset.id
      const index = event.target.dataset.check
      this.questions[index1].checkBoxChoices = this.questions[index1].checkBoxChoices.filter((item, i) => i !== parseInt(index))
   }

   handleMinScale(event) {
      const index = event.target.dataset.id
      this.questions[index].minScale = parseInt(event.target.value)
   }

   handleMaxScale(event) {
      const index = event.target.dataset.id
      this.questions[index].maxScale = parseInt(event.target.value)
   }

   handleMandate(event) {
      const index = event.target.dataset.id
      this.questions[index].required = event.target.checked
   }

   get jsonData() {
      return JSON.stringify(this.questions, null, 2)
   }

   
}
