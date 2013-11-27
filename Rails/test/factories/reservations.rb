# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :reservation do
    date "2013-11-17 17:43:23"
    time_slot_id 1
    room_id 1
    teaching_id 1
  end
end
