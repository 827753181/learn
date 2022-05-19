def removeDuplicates(nums):
    pos = 0
    for i in range(0, len(nums)):
        if i == 0 or nums[i-1] != nums[i]:
            # nums[pos] = nums[i]
            pos += 1
    print(nums)
    return pos

print(removeDuplicates([1, 1,1, 2, 2, 3, 3, 4, 4]))
