# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    username "MyString"
    access_token "MyString"
    isAdmin false
    teacher_id 1
  end
end
