const express = require("express");
const router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');

const District = require("./../../../../models/Addition/Location/District")
const Department = require("./../../../../models/Addition/Department");
const myimageurl = require("../../../../setup/myimageurl");
const SavedTender = require("../../../../models/ProUser/SavedTender");

// @type    GET
// /api/v1/forPublicWeb/getTender/tenderWithFilter

// @desc    route for getting all district
// @access  PRIVATE

router.post(
  "/tenderWithFilter",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    console.log(req.body)
    let myMatch = {"visibility.id":"public"}
    if(req.body.district?.districtLink){
      myMatch["district.districtLink"] = req.body.district?.districtLink
    }
    if(req.body.department?.departmentLink){
      myMatch["department.departmentLink"] = req.body.department?.departmentLink
    }
    console.log(myMatch)
    let TenderData = await Tender.aggregate([
        {$match:myMatch},
        {$project: { tenderNumber:1,
            tenderTitle:1,
            openingDate:1,
            closingDate:1,
            tenderAmount:1,
            department:1,
            district:1,
            "file1.url":1,
            "file2.url":1,
            shortDescription:1,
           }  
          }    
        ]).exec()
        let x = 0;
        let finalData = []
        while(x<TenderData.length){
        let td = TenderData[x]
        let dep = td.department
        let dUrl = dep.departmentLink
        let DepartmentData = await Department.aggregate([
            {$match:{departmentLink:dUrl}},
            {$project: { logo:1,              
               }  
              }    
            ]).exec()
            td.departmentLogo = myimageurl.biharGovLogo
            console.log(DepartmentData)
            if(DepartmentData[0].logo.url)
            {td.departmentLogo = DepartmentData[0].logo.url}
            td.isSaved = true
            finalData.push(td)
            x++
        }
        
        res.json(finalData)
  }
);
// @type    GET
// /api/v1/forPublicWeb/getTender/saveTender
// @desc    route for getting all saved Tender
// @access  PRIVATE

router.post(
  "/saveTender",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    let myMatch = {}
    if(req.body.district?.districtLink){
      myMatch["district.districtLink"] = req.body.district?.districtLink
    }
    if(req.body.department?.departmentLink){
      myMatch["department.departmentLink"] = req.body.department?.departmentLink
    }
    let SavedTenderData = await SavedTender.aggregate([
        {$match:myMatch},
        {$project: { tenderId:1,
           
           }  
          }    
        ]).exec()
        let allTenderId = []
        let k = 0
        while(k<SavedTenderData.length){
          allTenderId.push(mongoose.Types.ObjectId(SavedTenderData[k].tenderId))
          k++
        }
        console.log("allTenderId")
        console.log(allTenderId)
    let TenderData = await Tender.aggregate([
        {$match:{
          tenderId:{ $all: allTenderId }
        }},
        {$project: { tenderNumber:1,
            tenderTitle:1,
            openingDate:1,
            closingDate:1,
            tenderAmount:1,
            department:1,
            district:1,
            "file1.url":1,
            "file2.url":1,
            shortDescription:1,
           }  
          }    
        ]).exec()
        console.log("TenderData")
        console.log(TenderData)
        let x = 0;
        let finalData = []
        while(x<TenderData.length){
        let td = TenderData[x]
        let dep = td.department
        let dUrl = dep.departmentLink
        let DepartmentData = await Department.aggregate([
            {$match:{departmentLink:dUrl}},
            {$project: { logo:1,              
               }  
              }    
            ]).exec()
            td.departmentLogo = myimageurl.biharGovLogo
            console.log(DepartmentData)
            if(DepartmentData[0].logo.url)
            {td.departmentLogo = DepartmentData[0].logo.url}
            td.isSaved = true
            finalData.push(td)
            x++
        }
        console.log(SavedTenderData)
        res.json(finalData)
        console.log(finalData)
  }
);

// @type    GET
//@route    /api/v1/dropDown/publicDropDown/allDepartment
// @desc    route for getting all department
// @access  PRIVATE

router.get(
  "/favTenderWithFilter",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
       Department.find({})
       .then(
        data => (res.json(data))
       )
       .catch(err => console.log(err))
  }
);





module.exports = router;