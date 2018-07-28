

var courses = {
  courseList: [],
  selectedCourses: [],
  init: function () {

    function test(params, data) {
      console.log(params, data)
    }

    $.ajax({url: "http://127.0.0.1:8080/udacity/courses.json  ",
      success: function(result) {
        console.log(result)
        courses.courseList = result["courses"]
        console.log(courses.courseList)

        for (var i=0; i<courses.courseList.length; i++) {
          courses.courseList[i].id = i
          courses.courseList[i].text = courses.courseList[i].title
        }


        $('#course-select').select2({
          data: courses.courseList
        });

        $('#course-select').on('select2:select', function(ev) {
          console.log(ev.params.data)
          courses.selectedCourses.push(ev.params.data)
          courses.refreshTable()
        })
      }})

    $('#plan_btn').click(courses.planSchedule)
  },
  refreshTable: function () {
    $("#courselist tbody").html('')
    for (var i=0; i<courses.selectedCourses.length; i++) {
      let course = courses.selectedCourses[i]
      $("#courselist tbody").append(`<tr>
                                    <td>` + `<img class="image" src="${course.image}" width="100px"/>` + `</td>
                                    <td><a class="title" target="_blank "href="`+course.homepage+`">` + course.title + `</a></td>
                                    <td>` + '<input type="date" class="start_date" />'+ `</td>
                                    <td><span class="duration">` + course.expected_duration + '<span> <span class="expected_duration_unit">' + course.expected_duration_unit + `</span></td>
                                    <td>` + '<input type="number" style="width:30px" class="commitment" value="1" /> hours'+ `</td>
                                    </tr>`)
                                    // <td>` + '<input type="number" step="30" style="width:30px" class="min_slot" value="30"/> minutes'+ `</td>

    }
  },
  planSchedule: function () {
    var coursesToSchedule = []
    $('#courselist tbody tr').each(function(key, val) {
      console.log(key,val)
        var tds = $(val).find("td")
        coursesToSchedule.push({
          id: courses.selectedCourses[key].id,
          title: courses.selectedCourses[key].title,
          start_date: $($(tds[2]).find(".start_date")[0]).val(),
          duration: courses.selectedCourses[key].expected_duration,
          duration_unit: courses.selectedCourses[key].expected_duration_unit,
          commitment: parseInt($($(tds[4]).find(".commitment")[0]).val())
        })
        console.log(coursesToSchedule)
    })
  }
}