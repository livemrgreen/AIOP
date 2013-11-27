class CharacteristicSerializer < ActiveModel::Serializer
  attributes :id, :label

  has_many :rooms, embed: :ids
end
