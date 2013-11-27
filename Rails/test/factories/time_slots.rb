# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :time_slot do
    self.start "MyString"
    self.end "MyString"
  end
end
