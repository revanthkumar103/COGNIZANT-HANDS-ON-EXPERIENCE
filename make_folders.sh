#!/bin/bash
# Script to generate Week-5 folder structure automatically

WEEK_NAME="Week-5"

echo "Creating structured folders for $WEEK_NAME..."

# ---- MAIN SUBJECT: REACT ----
DIR_REACT="$WEEK_NAME/React"

# ---- MANDATORY HANDS-ON (Labs 1 to 5) ----
mkdir -p "$DIR_REACT/Mandatory"
mkdir -p "$DIR_REACT/Mandatory"/{1,2,3,4,5}-ReactJS-HOL

# ---- ADDITIONAL IMPORTANT HANDS-ON (Labs 6 to 8) ----
mkdir -p "$DIR_REACT/Additional"
mkdir -p "$DIR_REACT/Additional"/{6,7,8}-ReactJS-HOL

echo "Done! Week 5 folders have been successfully created."
