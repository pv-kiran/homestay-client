export function homeStayFormData(formData, data, parentKey = "") {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        // Recursive call for nested objects
        homeStayFormData(formData, value, formKey);
      } else if (Array.isArray(value)) {
        // Handle arrays
        value.forEach((item, index) => {
          const arrayKey = `${formKey}[${index}]`;
          if (typeof item === "object") {
            homeStayFormData(formData, item, arrayKey);
          } else {
            formData.append(arrayKey, item);
          }
        });
      } else {
        // Append scalar values (strings, numbers, etc.)
        formData.append(formKey, value);
      }
    }
  }
  }