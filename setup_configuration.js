# Setup Configurations Dynamically Create An Initial Setup
# This Setup Will Create A Welcome & Login Screen
# Using Advanced Technologies To Randomize Design Concepts

# Build Constant Route Setup
# Once You Run This File, It Will Ask For The Initial Route Names
# Route Names Are All The Screens This Project Will Contain
# Use A Comma To Seperate Each Route Name
# For Example: 
# Welcome, Login, Dashboard, Settings

##### Process Start
#!/bin/bash

# Print the current directory
current_directory=$(pwd)
echo "Current directory: $current_directory"

# List all files and folders in the current directory
echo "Files and folders in $current_directory:"
ls -la

read -p "Enter One Or Multiple Screens By Using Commas: " user_input
cleaned_input=$(echo "$user_input" | tr -d ' ')

IFS=',' read -r -a items <<< "$cleaned_input"

for item in "${items[@]}"; do
    # Use awk to capitalize the first letter and make the rest lowercase
    formatted_item=$(echo "$item" | awk '{print toupper(substr($0, 1, 1)) tolower(substr($0, 2))}')
    # Append the export statement to index.js
    echo "export const $item = \"$formatted_item\";" >>src/constants/routeNames/index.js

    # Define the directory path
    dir_path="src/screens/$item"
    echo "Direct Path"
    echo $dir_path
    
    # Check if the directory exists; if not, create it
    if [ ! -d "$dir_path" ]; then
        mkdir -p "$dir_path"
        echo "Created directory: $dir_path"
    else
        echo "Directory already exists: $dir_path"
    fi
    
    # Create the Screen Content(s) For Each Item
    screen_contents=$(cat <<EOL
import React from 'react'
import { Text, View } from 'react-native'

const $item = () => {
    return (
        <View>
            <Text>Hello From $item</Text>
        </View>
    )
}

export default $item
    )
    
    # Write the content directly to src/screens/$item/index.js
    echo "$screen_contents" > "$dir_path/index.js"
    echo "$item Screen File Has Been Created and Complete"
    
    # Define the directory path
    # Create the new component name
    component_name="${item}Component"
    component_dir_path="src/components/$component_name"
    echo "Component Path"
    echo $component_dir_path
    
    # Check if the directory exists; if not, create it
    if [ ! -d "$component_dir_path" ]; then
        mkdir -p "$component_dir_path"
        echo "Created directory: $component_dir_path"
    else
        echo "Directory already exists: $component_dir_path"
    fi
    
    # Create the Components For Each Item
    component_contents=$(cat <<EOL
import React from 'react'
import { Text, View } from 'react-native'

const $component_name = () => {
    return (
        <View>
            <Text>Hello From [$component_name] Component</Text>
        </View>
    )
}

export default $component_name
    )
    
    # Write the content directly to src/screens/$item/index.js
    echo "$component_contents" > "$component_dir_path/index.js"
    echo > "$component_dir_path/styles.js"
    echo "$item Component File Has Been Created and Complete"
    
    # Update The Screen Contents
    # Create the Screen Updated Contents For Each Item
    screen_component_contents=$(cat <<EOL
import React from 'react'
import $component_name from '../../components/${component_name}'

const $item = () => {
    return (
        <$component_name/>
    )
}
export default $item
    )
    
    # Write the content directly to src/screens/$item/index.js
    echo "$screen_component_contents" > "$dir_path/index.js"
    echo "$item Screen Update File Has Been Updated and Complete"
done
