import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  // Add the enrollment to the database
  const newEnrollment = { 
    _id: Date.now().toString(), // Unique ID for the enrollment
    user: userId, 
    course: courseId 
  };

  Database.enrollments = [...Database.enrollments, newEnrollment];

  // Return the new enrollment
  return newEnrollment;
}

export function deleteEnrollment(userId, courseId) {
  // Filter out the enrollment matching the userId and courseId
  const initialLength = Database.enrollments.length;

  Database.enrollments = Database.enrollments.filter(
    (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
  );

  // Check if an enrollment was deleted
  return Database.enrollments.length < initialLength;
}
import model from "./model.js";
export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}