class GroupSerializer < ActiveModel::Serializer
  attributes :id, :label, :parent_id
end
