import { LightningElement, track } from 'lwc';
import fetchSurvey from '@salesforce/apex/SurveyFetcher.fetchSurvey';
import endUserSurvey from '@salesforce/apex/SurveyControllerEndUser.endUserSurvey';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SurveyEndUser extends LightningElement {
   @track surveyData
   @track error
   @track results
   Id = 'a01dM00000HJLIO'

   connectedCallback() {
        // Call fetchSurvey method from Apex and pass the surveyId
      this.getSurveyData(this.Id)
    }

   getSurveyData(surveyId) {
        fetchSurvey({ surveyId: surveyId })
            .then(result => {
                this.surveyData = JSON.parse(result)
                this.results = JSON.parse(result)
                console.log('Survey Data: ', this.surveyData)
            })
            .catch(error => {
                this.error = error;
                console.error('Error fetching survey data: ', error);
            });
    }

    handleChange(event) {
      const page = event.target.dataset.page
      const question = event.target.dataset.quest
      
      // this.results[page][question].inputType = event.target.value
      this.results[page].questions[question].answer = event.target.value
      console.log(JSON.stringify(this.results))
      // console.log(page, question, JSON.stringify(this.results))
    }

    submitSurvey(event) {
      console.log(this.results)
      // alert(JSON.stringify(this.surveyData, null, 2))
      const EndData = JSON.stringify(this.results);

      endUserSurvey({ surveyId: this.Id, pagesJson: EndData })
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