# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :lesson do
    label "MyString"
    lesson_type_id 1
    subject_id 1
  end
end
