# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :group do
    label "MyString"
    parent_id 1
  end
end
