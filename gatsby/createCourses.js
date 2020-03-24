// const path = require(`path`)
// module.exports = async ({ actions, graphql }) => {
//   // Setup our query
//   const GET_COURSES = `
//         query GET_COURSES($first:Int $after:String){
//             wpgraphql{
//                 courses(
//                     first: $first
//                     after: $after
//                 ){
//                     pageInfo{
//                         endCursor
//                         hasNextPage
//                     }
//                     nodes{
//                         uri
//                         title(format: RENDERED)
//                         id
//                         slug
//                         featuredImage {
//                             sourceUrl(size: LARGE)
//                         }
//                         courseFields {
//                             careerOpportunities
//                             departmentHead
//                             label
//                             totalUnits
//                         }
//                     }
//                 }
//             }
//         }
//     `

//   const { createPage } = actions
//   const allCourses = []

//   // Create a function for getting courses
//   const fetchCourses = async variables =>
//     await graphql(GET_COURSES, variables).then(({ data }) => {
//       const {
//         wpgraphql: {
//           courses: {
//             nodes,
//             pageInfo: { hasNextPage, endCursor },
//           },
//         },
//       } = data

//       nodes.map(course => {
//         allCourses.push(course)
//       })
//       if (hasNextPage) {
//         return fetchCourses({ first: variables.first, after: endCursor })
//       }
//       return allCourses
//     })

//   // Map over all the courses and call createCourse
//   await fetchCourses({ first: 100, after: null }).then(allCourses => {
//     const courseTemplate = path.resolve(`./src/templates/course.js`)

//     allCourses.map(course => {
//       console.log(`create course: ${course.uri}`)
//       createPage({
//         path: `/${course.uri}`,
//         component: courseTemplate,
//         context: course,
//       })
//     })
//   })
// }
