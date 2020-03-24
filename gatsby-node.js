/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const createPages = require(`./gatsby/createPages`)
const createPosts = require(`./gatsby/createPosts`)
const createCategories = require(`./gatsby/createCategories`)
const createEvents = require(`./gatsby/createEvents`)
// const createCourses = require(`./gatsby/createCourses`)

exports.createPages = async ({ actions, graphql }) => {
  await createPages({ actions, graphql })
  await createPosts({ actions, graphql })
  await createCategories({ actions, graphql })
  await createEvents({ actions, graphql })
  // await createCourses({ actions, graphql })
}
