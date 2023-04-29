<?php

// Connect to the database
$conn = mysqli_connect('localhost', 'root', 'password', 'event');

// Check if the connection was successful
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Get the form data
$name = $_POST['eventName'];
$start_time = $_POST['startTime'];
$end_time = $_POST['endTime'];
$location = $_POST['location'];
$description = $_POST['description'];
$category = $_POST['category'];
$banner_image = $_FILES['bannerImage']['name'];
$banner_image_tmp = $_FILES['bannerImage']['tmp_name'];

// Move the uploaded file to a new location
$uploads_dir = 'uploads/';
move_uploaded_file($banner_image_tmp, $uploads_dir . $banner_image);

// Insert the form data into the database
$sql = "INSERT INTO events (name, start_time, end_time, location, description, category, banner_image) VALUES ('$name', '$start_time', '$end_time', '$location', '$description', '$category', '$banner_image')";
$result = mysqli_query($conn, $sql);

// Check if the query was successful
if ($result) {
  echo "Event created successfully!";
} else {
  echo "Error creating event: " . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);

?>
