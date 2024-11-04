import React from 'react';
import {  Controller } from 'react-hook-form';
import Select from 'react-select';
import CalenderView from './calender/CalenderView';

export function FormField({
  type,
  name,
  label,
  register,
  control,
  error,
  placeholder,
  options = [],
  rows = 4,
  isMulti = false,
  disabled = false
}) {
  const baseInputStyles = "w-full rounded-lg border border-gray-300 bg-white py-3 px-4 text-sm placeholder:text-gray-400 focus:border-turquoise-500 focus:outline-none focus:ring-1 focus:ring-turquoise-500";
  
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...register(name)}
            rows={rows}
            placeholder={placeholder}
            className={baseInputStyles}
          />
        );

      case 'select':
        return (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                isMulti={isMulti}
                placeholder={placeholder || "Select..."}
                className="text-sm"
                classNames={{
                  control: (state) => 
                    `!rounded-lg !border-gray-300 !bg-white !shadow-none !ring-0 ${
                      state.isFocused ? '!border-turquoise-500 !ring-1 !ring-turquoise-500' : ''
                    }`,
                  option: (state) =>
                    `!text-sm ${
                      state.isSelected
                        ? '!bg-turquoise-500'
                        : state.isFocused
                        ? '!bg-turquoise-50'
                        : ''
                    }`,
                  input: () => "!text-sm",
                  placeholder: () => "!text-sm !text-gray-400",
                  singleValue: () => "!text-sm",
                  multiValue: () => "!bg-turquoise-100",
                  multiValueLabel: () => "!text-turquoise-800",
                  multiValueRemove: () => "!text-turquoise-800 hover:!bg-turquoise-200",
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#14b8a6',
                    primary25: '#f0fdfa',
                    primary50: '#ccfbf1',
                    primary75: '#99f6e4',
                  },
                })}
              />
            )}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  {...register(name)}
                  className="h-4 w-4 border-gray-300 text-turquoise-500 focus:ring-turquoise-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register(name)}
              className="h-4 w-4 rounded border-gray-300 text-turquoise-500 focus:ring-turquoise-500"
            />
            <span className="text-sm text-gray-700">{placeholder}</span>
          </label>
        );
      
      case 'date':
        return <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <CalenderView
              selectedDate={value}
              onDateSelect={(date) => onChange(date)}
              error={error}
              disabled={disabled}
            />
        )}
    />

      default:
        return (
          <input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            className={baseInputStyles}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      {type !== 'checkbox' && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {renderField()}
      {error && (
        <p className="text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
}