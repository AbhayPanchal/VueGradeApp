// StAuth10222: I Zeel Patel, 000824838 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. 
//I have not made my work available to anyone else.

const GradeList = {
    //here is all the initial data variables
    data() {
        return {
            grades: [

            ],
            subject: '',
            subjects: [],
            gradeOnly: [],
            filteredData: [],
            aveFilter: [],
            aveFiltergrade: [],
            grade: '',
            msg: '',
            i: '',
            con: 'new',
            editing: false,
            editingId: 0,
            modalShow: true,
            subfilter: '',
            isActive: false,
            isActivefail: false,
            min: '',
            max: '',
            average: '',
            colorVar: '',
            colorVarFail: '',
            animation: false
        }
    },

    //All methods are here that are used to add functionality in the application
    methods: {

        //Adding Subjects and Grades to an array and also handing the errors by user
        addSubject() {
            this.con = 'new';
            this.subject = this.subval;
            this.grade = this.gradval;

            console.log(this.subject);


            console.log(this.subjects.includes(this.subject))

            if (this.subjects.includes(this.subject)) {
                this.msg = "Invalid input for Subject!!"
                console.log("Not allowed")

                this.gradval = '';
                this.subval = '';
                this.subject = '';
                this.grade = '';
            } else if (this.grade < 0 || this.grade > 100) {
                this.msg = "Grades has to be from 0 to 100!"
                console.log("Not allowed")

                this.gradval = '';
                this.subval = '';
                this.subject = '';
                this.grade = '';
            } else if (this.subject == '' || this.subject === undefined) {
                this.msg = "Invalid input for Subject!!"
                console.log("Not allowed un")

                this.gradval = '';
                this.subval = '';
                this.subject = '';
                this.grade = '';

                console.log(this.subval);
                console.log(this.subject);
            }else if (this.grade == '' || this.grade === undefined) {
                this.msg = "Invalid input for Grades!!"
                console.log("Not allowed un")

                this.gradval = '';
                this.subval = '';
                this.subject = '';
                this.grade = '';

                console.log(this.subval);
                console.log(this.subject);
            }else {

                this.msg = '';
                this.subjects.push(this.subject);
                this.gradeOnly.push(this.grade);

                this.grades.push({ sub: this.subval, gra: this.gradval });
                console.log(this.grades);

                //this.min = Math.min.apply(Math, this.grades.gra);
                this.min = this.grades.sort((a, b) => a.gra - b.gra)[0].gra;

                this.max = this.grades.sort((a, b) => b.gra - a.gra)[0].gra;
                if (this.gradeOnly.length > 0) {
                    this.average = Math.round(this.findAve(this.gradeOnly));
                }

                this.gradval = '';
                this.subval = '';
                this.subject = '';
                this.grade = '';

                //this.editing = false;
            }
        },

        //Finding an Average from an array
        findAve(array) {
            let ave = 0;
            for (let i = 0; i < array.length; i++) {
                let currentNum = array[i]
                ave += currentNum;
            }

            ave = ave / array.length;
            return ave;
        },

        //Deleteing an item from an array
        deleteSubject(index) {
            console.log("delete")

            this.animation = true;
            console.log("animation" + this.animation);

            this.grades.splice(index, 1);
            this.subjects.splice(index, 1);
            this.gradeOnly.splice(index, 1);
            //console.log(this.grades);
            this.min = this.gradeOnly.sort((a, b) => a - b)[0];
            this.max = this.gradeOnly.sort((a, b) => b - a)[0];
            this.average = Math.round(this.findAve(this.gradeOnly));

            this.gradval = '';
            this.subval = '';

            this.animation = false;
        },

        //Editing an item from an array
        editSubject(i, index) {
            this.con = 'edit';
            this.modalShow = true;
            this.i = i;

            console.log(i);
            this.subval = i.sub;
            this.gradval = i.gra;
            console.log(this.subval);
            console.log(this.gradval);

            this.editing = true;
            this.editingId = index;

        },

        //MEthod to show modal after clicking on "Create Grades Button"
        modalview() {
            this.modalShow = true;
            console.log(this.modalShow);

            this.subval = '';
            this.gradval = '';
        },

        //Updateing the value of an array item 
        updateSubject() {
            console.log("update");

            this.con = 'new';

            if(this.gradval < 0 || this.gradval > 100 || this.subval == '' || this.gradval == '' || this.subval == undefined || this.gradval == undefined){
                this.msg = "invalid Edit!"
                this.modalShow = false;
                
            }else{

                this.grades[this.editingId].sub = this.subval;
                this.grades[this.editingId].gra = this.gradval;

                this.gradeOnly[this.editingId] = this.gradval;
                this.subjects[this.editingId] = this.subval;

                this.min = this.grades.sort((a, b) => a.gra - b.gra)[0].gra;
                this.max = this.grades.sort((a, b) => b.gra - a.gra)[0].gra;
                this.average = Math.round(this.findAve(this.gradeOnly));

                this.gradval = '';
                this.subval = '';
                this.modalShow = false;
                this.msg = '';
            }
            //this.modalShow = true;

        },
        //Sorting the list eaither by Grades or Subject
        sortDec() {
            this.grades.sort((a, b) => a.gra < b.gra ? 1 : -1);
        },

        sortAce() {
            this.grades.sort((a, b) => a.gra > b.gra ? 1 : -1);
        },

        sortSubDec() {
            this.grades.sort((a, b) => a.sub.toLowerCase() < b.sub.toLowerCase() ? 1 : -1);
        },

        sortSubAce() {
            this.grades.sort((a, b) => a.sub.toLowerCase() > b.sub.toLowerCase() ? 1 : -1);
        },

        //Methods for making button ON or OFF

        toggle() {
            if (!this.isActive) {
                this.isActive = true;
                this.colorVar = 'green';

            } else {
                this.isActive = false;
                this.colorVar = '';
            }
            console.log(this.isActive);
        },

        toggleFail() {
            if (!this.isActivefail) {
                this.isActivefail = true;
                this.colorVarFail = 'green';

            } else {
                this.isActivefail = false;
                this.colorVarFail = '';
            }
            console.log(this.isActivefail);
        },
    },

    //Used Computed Properties for Adding Filter to the List

    computed: {
        filterList() {
            if (this.subfilter.trim().length > 0) {
                this.filteredData = this.grades.filter((subject) =>
                    subject.sub.toLowerCase().includes(this.subfilter.trim().toLowerCase()))

                for (let i = 0; i < this.filteredData.length; i++) {
                   
                    this.aveFilter.push(this.filteredData[this.filteredData.length - 1]);

                    console.log(this.aveFilter[i].gra);

                    this.aveFiltergrade.push(this.aveFilter[this.filteredData.length - 1].gra);
                    console.log(this.aveFiltergrade);
                }

                //console.log(this.filteredData[0].gra);

                this.min = this.filteredData.sort((a, b) => a.gra - b.gra)[0].gra;
                this.max = this.filteredData.sort((a, b) => b.gra - a.gra)[0].gra;
                this.average = Math.round(this.findAve(this.aveFiltergrade));

                if(this.isActivefail == true){
                    this.filteredData.filter((g) => g.gra < 50);
                }else if (this.isActive == true) {
                    return this.filteredData.filter((g) => g.gra >= 80);
                }

                return this.filteredData;

            }

            if (this.isActive == true) {
                this.filteredData = this.grades.filter((g) => g.gra >= 80);
                this.min = this.filteredData.sort((a, b) => a.gra - b.gra)[0].gra;
                this.max = this.filteredData.sort((a, b) => b.gra - a.gra)[0].gra;
                return this.filteredData;
            }

            if (this.isActivefail == true) {
                this.filteredData = this.grades.filter((g) => g.gra < 50);
                this.min = this.filteredData.sort((a, b) => a.gra - b.gra)[0].gra;
                this.max = this.filteredData.sort((a, b) => b.gra - a.gra)[0].gra;
                return this.filteredData;
            }

            this.min = this.gradeOnly.sort((a, b) => a - b)[0];
            this.max = this.gradeOnly.sort((a, b) => b - a)[0];
            this.average = Math.round(this.findAve(this.gradeOnly));

            return this.grades
        }
    }
};

const app = Vue.createApp(GradeList).mount("#app");